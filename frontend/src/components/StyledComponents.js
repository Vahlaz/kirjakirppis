import {
    Button,
    styled,
    TextField,
    Accordion
} from '@material-ui/core'

const CssTextField = styled(TextField)({
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '& .MuiTypography-root': {
        color: 'white'
    },
    '& .MuiInputBase-root': {
        color: 'white',
    },
    '& label.Mui-focused': {
        color: 'white',
    },
    '& label': {
        color: 'white'
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
    '& .MuiFormHelperText-root	': {
        color: 'white',
    },
})

const CssButton = styled(Button)({
    backgroundColor: '#232a32',
    borderColor: 'white',
    '& .MuiButton-label': {
        color: 'white'
    },
    '&:hover': {
        borderColor: '#b5b5b5'
    }
})

const CssAccordion = styled(Accordion)({
    backgroundColor: '#232a32',
    color: "white",
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
})

export { CssTextField, CssButton, CssAccordion }