const express = require('express');
const resumeAnalyzer = require('../services/resumeAnalyzer');

const router = express.Router();

/**
 * UNIQUE FEATURE: Resume-to-Interview Generator
 * These routes enable AI-powered personalized interview prep
 */

// @POST /api/resume/analyze
// Upload resume and extract skills
router.post('/analyze', async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        error: 'Resume text is required',
      });
    }

    const skills = await resumeAnalyzer.extractSkills(resumeText);

    res.json({
      success: true,
      data: {
        profile: skills,
        message: 'Resume analyzed successfully',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to analyze resume',
      message: error.message,
    });
  }
});

// @POST /api/resume/generate-questions
// Generate personalized interview questions based on resume
router.post('/generate-questions', async (req, res) => {
  try {
    const { resumeProfile, count = 10 } = req.body;

    if (!resumeProfile) {
      return res.status(400).json({
        success: false,
        error: 'Resume profile is required',
      });
    }

    const questions = await resumeAnalyzer.generatePersonalizedQuestions(
      resumeProfile,
      count
    );

    res.json({
      success: true,
      data: {
        questions,
        count: questions.length,
        message: 'Questions generated based on your profile',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate questions',
      message: error.message,
    });
  }
});

// @POST /api/resume/evaluate-answer
// Evaluate user's answer to an interview question
router.post('/evaluate-answer', async (req, res) => {
  try {
    const { question, userAnswer, expectedKeywords } = req.body;

    if (!question || !userAnswer) {
      return res.status(400).json({
        success: false,
        error: 'Question and user answer are required',
      });
    }

    const evaluation = await resumeAnalyzer.evaluateAnswer(
      question,
      userAnswer,
      expectedKeywords || []
    );

    res.json({
      success: true,
      data: {
        evaluation,
        message: 'Answer evaluated successfully',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to evaluate answer',
      message: error.message,
    });
  }
});

// @POST /api/resume/prep-plan
// Generate a customized 4-week interview prep plan
router.post('/prep-plan', async (req, res) => {
  try {
    const { resumeProfile } = req.body;

    if (!resumeProfile) {
      return res.status(400).json({
        success: false,
        error: 'Resume profile is required',
      });
    }

    const plan = await resumeAnalyzer.generatePrepPlan(resumeProfile);

    res.json({
      success: true,
      data: {
        plan,
        message: 'Preparation plan generated',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate prep plan',
      message: error.message,
    });
  }
});

// @POST /api/resume/learning-resources
// Get personalized learning resources based on weak areas
router.post('/learning-resources', async (req, res) => {
  try {
    const { resumeProfile, performanceHistory = {} } = req.body;

    if (!resumeProfile) {
      return res.status(400).json({
        success: false,
        error: 'Resume profile is required',
      });
    }

    const resources = await resumeAnalyzer.suggestLearningResources(
      resumeProfile,
      performanceHistory
    );

    res.json({
      success: true,
      data: {
        resources,
        message: 'Learning resources suggested based on your profile',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to suggest resources',
      message: error.message,
    });
  }
});

module.exports = router;
