const moment = require('moment')
const { Op } = require('sequelize')
const { User, Appointment } = require('../models')

class ProviderController {
  async appointments (req, res) {
    const { provider } = req.session.user
    if (!provider) {
      return res.redirect('/app/dashboard')
    }

    return res.render('provider/index')
  }

  async confirmed (req, res) {
    const date = moment(parseInt(req.query.date))

    const { id } = req.session.user

    const appointments = await Appointment.findAndCountAll({
      include: [{ model: User, as: 'user' }],
      where: {
        provider_id: id,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    console.log(appointments)

    return res.render('provider/confirmed', { appointments })
  }
}

module.exports = new ProviderController()
