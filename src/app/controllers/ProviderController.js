const { User, Appointment } = require('../models')

class ProviderController {
  async appointments (req, res) {
    const { id, provider } = req.session.user
    if (!provider) {
      return res.redirect('/app/dashboard')
    }

    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: { provider_id: id }
    })

    return res.render('provider/index', { appointments })
  }
}

module.exports = new ProviderController()
