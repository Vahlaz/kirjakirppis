const { UserInputError } = require("apollo-server")

const formatError = (error) => {
    if (error.message.includes('$price')) {
        return new UserInputError('Hintaa ei ole määritelty')
    }
    if (error.message.includes('$title')) {
        return new UserInputError('Kirjaa ei ole määritelty')
    }
    if (error.message.includes('$condition')) {
        return new UserInputError('Kuntoa ei ole valittu')
    }
    if (error.message.includes('$school')) {
        return new UserInputError('Koulua ei ole valittu')
    }
    if (error.message.includes('email')) {
        return new UserInputError('Sähköposti on pakollinen. ')
    }
    if (error.message.includes('password')) {
        return new UserInputError('Salasana on pakollinen. ')
    }
    return error
}

module.exports = formatError