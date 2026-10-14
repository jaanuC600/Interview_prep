
const axios = require('axios');
const pLimit = require('p-limit');

const limit = pLimit(5); // max 5 OpenAI calls in flight at once

// Single place that talks to OpenAI: timeout + retry with backoff on 429 / 5xx / timeouts
async function callOpenAI(body, retries = 3) {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        body,
        { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, timeout: 30000 }
      );
      return res.data.choices[0].message.content;
    } catch (err) {
      const status = err.response?.status;
      const retryable = status === 429 || status >= 500 || err.code === 'ECONNABORTED';
      if (!retryable || attempt >= retries) throw err;
      const wait = Number(err.response?.headers?.['retry-after']) * 1000 || 2 ** attempt * 1000;
      await new Promise((r) => setTimeout(r, wait + Math.random() * 250));
    }
  }
}

/**
 * Resume Analyzer Service
 * Analyzes user's resume and generates personalized interview questions
 * This is a UNIQUE feature that sets Interview Prep Platform apart!
 */

class ResumeAnalyzer {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
  }

  /**
   * Extract skills from resume text
   * Uses AI to intelligently identify technical and soft skills
   */
  async extractSkills(resumeText) {
    try {
      const prompt = `
Analyze this resume and extract:
1. Technical Skills (programming languages, frameworks, tools)
2. Soft Skills (leadership, communication, etc.)
3. Experience Level (entry, mid, senior)
4. Primary domains (web dev, ML, DevOps, etc.)

Resume:
${resumeText}

Return as JSON with keys: technicalSkills (array), softSkills (array), experienceLevel (string), domains (array)
`;

      const content = await limit(() => callOpenAI({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
        }));
      const jsonMatch = content.match(/\{[^{}]*\}/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
      console.error('Error extracting skills:', error.message);
      throw error;
    }
  }

  /**
   * Generate personalized interview questions
   * Questions are tailored to user's skills and experience
   * UNIQUE FEATURE: No other platform does this!
   */
  async generatePersonalizedQuestions(resumeProfile, count = 10) {
    try {
      const { technicalSkills, softSkills, experienceLevel, domains } = resumeProfile;

      const prompt = `
Generate ${count} interview questions for a ${experienceLevel} developer with:
Technical Skills: ${technicalSkills.join(', ')}
Domains: ${domains.join(', ')}
Soft Skills: ${softSkills.join(', ')}

Requirements:
1. 30% questions should test their specific technical skills
2. 30% questions should be behavioral (soft skills)
3. 20% questions should be system design or architecture (appropriate for ${experienceLevel} level)
4. 20% questions should be problem-solving and edge cases

For each question, provide:
- Question text
- Expected answer keywords
- Why this question is relevant to their profile
- Difficulty level (easy/medium/hard)

Return as JSON array with objects containing: question, expectedKeywords (array), relevance (string), difficulty (string)
`;

      const content = await limit(() => callOpenAI({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 2000,
        }));
      const jsonMatch = content.match(/\[.*\]/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (error) {
      console.error('Error generating questions:', error.message);
      throw error;
    }
  }

  /**
   * Evaluate user's interview answer
   * AI-powered assessment of the answer quality
   */
  async evaluateAnswer(question, userAnswer, expectedKeywords) {
    try {
      const prompt = `
Evaluate this interview answer:

Question: ${question}
Expected Keywords/Topics: ${expectedKeywords.join(', ')}
User's Answer: ${userAnswer}

Provide:
1. Score (0-100)
2. Strengths (array of what they did well)
3. Weaknesses (array of what they missed)
4. Improvements (array of suggestions to improve)
5. Feedback (brief, constructive feedback)

Return as JSON with keys: score, strengths (array), weaknesses (array), improvements (array), feedback (string)
`;

      const content = await limit(() => callOpenAI({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
        }));
      const jsonMatch = content.match(/\{[^{}]*\}/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
      console.error('Error evaluating answer:', error.message);
      throw error;
    }
  }

  /**
   * Generate interview preparation plan
   * Based on resume analysis, create a customized study plan
   */
  async generatePrepPlan(resumeProfile) {
    try {
      const { technicalSkills, softSkills, experienceLevel, domains } = resumeProfile;

      const prompt = `
Create a 4-week interview preparation plan for a ${experienceLevel} developer:
Current Skills: ${technicalSkills.join(', ')}
Areas: ${domains.join(', ')}
Target: Senior Technical Interview

Plan should include:
1. Week 1: Focus areas (what to practice)
2. Week 2: Practice problems and topics
3. Week 3: Mock interviews and system design
4. Week 4: Final reviews and weak areas

Each week should have:
- Main focus
- Daily topics (5 days)
- Problems to solve (specific count)
- Mock interview topics

Return as JSON with weeks array containing focus, dailyTopics (array), problemsCount (number), mockInterviewTopics (array)
`;

      const content = await limit(() => callOpenAI({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.6,
          max_tokens: 1500,
        }));
      const jsonMatch = content.match(/\{.*\}/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
      console.error('Error generating prep plan:', error.message);
      throw error;
    }
  }

  /**
   * Suggest gap-filling resources
   * Identifies weak areas and recommends topics to study
   */
  async suggestLearningResources(resumeProfile, performanceHistory) {
    try {
      const { technicalSkills, domains } = resumeProfile;

      const prompt = `
Based on:
User's Skills: ${technicalSkills.join(', ')}
Weak Topics (from performance): ${performanceHistory.weakTopics?.join(', ') || 'None yet'}
Domains: ${domains.join(', ')}

Suggest learning resources:
1. Top 5 topics to master
2. For each topic: recommended LeetCode problem patterns
3. System design topics if applicable
4. Recommended YouTube channels/courses
5. Books or articles

Return as JSON with topics (array of {name, leetcodePatterns (array), resources (array)})
`;

      const content = await limit(() => callOpenAI({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 1200,
        }));
      const jsonMatch = content.match(/\{.*\}/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
      console.error('Error suggesting resources:', error.message);
      throw error;
    }
  }
}

module.exports = new ResumeAnalyzer();
