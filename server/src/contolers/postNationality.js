const { Nationality } = require('../db');
const textRegex = /^[A-Za-z]+([- ][A-Za-z]+)*$/;


const postNation = async (req,res) => {
    try {
        const errors = [];
        let {nationality}= req.body;

        nationality = nationality.trim();
        nationality = nationality.charAt(0).toUpperCase() + nationality.slice(1).toLowerCase();

        const existingNationality = await Nationality.findOne({
            where: {
                name: nationality
            }
        });

        if (!textRegex.test(nationality)) {
            errors.push('Invalid format');
        }

        if (existingNationality ) {
            errors.push('That nationality already exists in the system');

        }


        if (errors.length > 0) {
            res.status(400).json({ message: errors});
            return;
        }

        const newNationality = await Nationality.create({
            name: nationality
        });

        res.status(200).json({ message: 'Nationality successfully registered' , newNationality});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={postNation};