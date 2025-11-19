import { sendOtpMail, verifyOtpMail, userAccDeactivateRequest } from '@features/auth/authSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const DeleteAccounthooks = (props) => {
    const { email, ...rest } = props

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const [otpVerified, setOtpVerified] = useState(false)
    const [user, setUser] = useState([])
    const [timer, setTimer] = useState(0);
    const [requestMessage,setRequestMessage] = useState('')
    const [requestSent,setRequestSent] =useState(false)

    const onSubmit = (data) => {
        try {
            setLoader(true)
            dispatch(sendOtpMail(data)).then((response) => {

                if (response?.payload?.statusCode === 200) {
                    toast.success(response?.payload?.message || "OTP Sent!");
                    toast.success(response?.payload?.data);
                    setOpen(true)
                    setLoader(false)
                    setUser(response?.payload?.data)
                    setTimer(60 * 5)
                    rest?.otpReset()

                }
            })
        } catch (error) {
            setLoader(false)
        }
    }

    const onSubmitOtp = (data) => {
        try {
            setLoader(true)
            const payload = {
                email: email,
                otp: Number(data?.otp)
            }

            dispatch(verifyOtpMail(payload)).then((response) => {

                if (response?.payload?.statusCode === 200) {
                    toast.success(response?.payload?.message || "OTP Verified!");
                    toast.success(response?.payload?.data);
                    setOpen(true)
                    setLoader(false)
                    setOtpVerified(true)
                    setTimer(0)
                }
            })
        } catch (error) {
            console.log(error,"errrrrrrrrrrrrrrrrrr")
            setLoader(false)
        }
    };

    const cancelRequest = () => {
        setOpen(false)
        rest?.reset()
        rest?.otpReset()
        setTimer(0)
        setOtpVerified(false)
        setLoader(false)
    }


    // Timer countdown
    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const onSubmitRequest = async () => {
        try {
            setLoader(true)
            const payload = {
                email: email,
            }

            dispatch(userAccDeactivateRequest(payload)).then((response) => {

                if (response?.payload?.statusCode === 200) {
                    toast.success(response?.payload?.message);
                    toast.success(response?.payload?.data);
                    setOpen(true)
                    setLoader(false)
                    setOtpVerified(true)
                    setTimer(0)
                    rest?.reset()
                    rest?.otpReset()
                    setRequestSent(true)
                    setRequestMessage(response?.payload?.message)
                }
            })
        } catch (error) {
            setLoader(false)
        }
    }

    return {
        onSubmit,
        open,
        setOpen,
        onSubmitOtp,
        loader,
        setTimer,
        timer,
        user,
        otpVerified,
        cancelRequest,
        onSubmitRequest,
        requestMessage,
        requestSent
    }
}

export default DeleteAccounthooks