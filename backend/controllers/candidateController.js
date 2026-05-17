const Candidate = require('../models/Candidate');

// @desc    Add new candidate
// @route   POST /api/candidates
exports.addCandidate = async (req, res) => {
  try {
    const { name, email, skills, experience, bio } = req.body;
    
    const candidateExists = await Candidate.findOne({ email });
    if (candidateExists) {
      return res.status(400).json({ message: 'Candidate with this email already exists' });
    }

    const candidate = await Candidate.create({
      name,
      email,
      skills,
      experience,
      bio
    });

    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all candidates
// @route   GET /api/candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({}).sort({ createdAt: -1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Match candidates based on requirements
// @route   POST /api/match
exports.matchCandidates = async (req, res) => {
  try {
    const { requiredSkills, minExperience } = req.body;

    if (!requiredSkills || !Array.isArray(requiredSkills) || requiredSkills.length === 0) {
      return res.status(400).json({ message: 'requiredSkills array is required' });
    }

    const minExp = minExperience ? Number(minExperience) : 0;

    const candidates = await Candidate.find({ experience: { $gte: minExp } });

    const matchedCandidates = candidates.map(candidate => {
      const candidateSkills = candidate.skills.map(s => s.toLowerCase().trim());
      
      const matchedSkills = requiredSkills.filter(reqSkill => 
        candidateSkills.includes(reqSkill.toLowerCase().trim())
      );

      const matchScore = Math.round((matchedSkills.length / requiredSkills.length) * 100);

      return {
        candidate,
        matchScore,
        matchedSkills,
      };
    });

    matchedCandidates.sort((a, b) => b.matchScore - a.matchScore);

    res.json(matchedCandidates);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
