const School = require('../models/School');

const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = deg => deg * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const newSchool = await School.create({ name, address, latitude, longitude });
    res.status(201).json(newSchool);
  } catch (err) {
    res.status(500).json({ message: 'Error adding school', error: err });
  }
};

exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude required' });
    }

    const schools = await School.findAll();

    const sorted = schools.map(s => {
      const distance = haversine(
        parseFloat(latitude), parseFloat(longitude),
        s.latitude, s.longitude
      );
      return { ...s.dataValues, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching schools', error: err });
  }
};



exports.deleteSchool = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'School ID is required' });
  }

  try {
    const deleted = await School.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: 'School not found' });
    }

    res.status(200).json({ message: 'School deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting school', error: err });
  }
};
