import './form-input.style.scss'

const FormInput = ({ label, inputOptions}) => {

    return(
        <div className="group">
                {/* If the value of the input has input class = shrink if not class = null */}
                <input {...inputOptions } className="form-input"/>
            {
                label && (
                    <label className={`${inputOptions.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
                )
            }
        </div>
    )
}

export default FormInput