const errorMap = require("../constants/errorMap");
const teamServices = require("../services/teamServices");

/**
 * Create a new team and add data. The user that creates it will automatically
 * become the admin
 *
 * @param {string} req.body.name - Name of the team
 * @param {string} req.body.classCode - UNSW class code  (like COMP1511)
 * @param {string} req.body.assignment - Name of the assignment
 * @param {string} [req.body.pokemonName]
 * @param {number} [req.body.xp]
 * @param {number} [req.body.hp]
 * @param {number} [req.body.attasdack]
 * @param {number} [req.body.defence]
 * @param {number} [req.body.spAttack]
 * @param {number} [req.body.spDefense]
 * @param {number} [req.body.speed]
 */

const createTeam = async (req, res) => {
  try {
    const teamData = await teamServices.createTeam(req.user.id, req.body);
    return res.status(201).json({ success: true, data: teamData });
  } catch (err) {
    const status = errorMap[err.code]?.httpStatus || 500;
    let message = err.message || "Internal server error";

    return res.status(status).json({ success: false, message: message });
  }
};

const joinTeam = async (req, res) => {
  try {
    const teamData = await teamServices.joinTeam(
      req.user.id,
      req.params.randomCode
    );
    return res.status(200).json({ success: true, data: teamData });
  } catch (err) {
    const status = errorMap(err.code)?.httpStats || 500;
    let message = err.message || "Internal server error";

    return res.status(status).json({ success: false, message: message });
  }
};

const leaveTeam = async (req, res) => {
    try {
        await teamServices.leaveTeam(req.user.id)
        return res.status(200).json({ success: true, message: 'Team left sucessfully'})
    } catch (err) {
        const status = errorMap(err.code)?.httpStats || 500;
        let message = err.message || "Internal server error";

        return res.status(status).json({ success: false, message: message });
    }
}

module.exports = { createTeam, joinTeam, leaveTeam };
