
const Step = (props)=>{
    let {step, setStep} = props
    return (
        <ul className="my-3 progress-circle justify-content-center">
            <li className={step == 1? 'current': ''} onClick = {()=> setStep('step', 1)}>
                <a href="#" >
                    <div className="circle inner-shadow-xs"></div>
                </a>
            </li>
            <li className={step == 2? 'current': ''} onClick = {()=> setStep('step', 2)}>
                <a href="#">
                    <div className="circle inner-shadow-xs"></div>
                </a>
            </li>
            <li className={step == 3? 'current': ''} onClick = {()=> setStep('step', 3)}>
                <a href="#">
                    <div className="circle inner-shadow-xs"></div>
                </a>
            </li>
        </ul>
    )
}

export default Step