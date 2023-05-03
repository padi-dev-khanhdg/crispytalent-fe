import { useSetRecoilState } from "recoil"
import { checkCorrectState, checkWrongState } from "src/recoil/candidate/checkState"
import { playAudio } from "src/utils/play"

export const useCheckCorrectAndError = () => {
    const setWrong = useSetRecoilState(checkWrongState)
    const setCorrect = useSetRecoilState(checkCorrectState)
    const checkCorrect = async () => {
        await setCorrect(true)
        await playAudio('/audio/SoundCorrect.mp3').then(() => {
            setCorrect(false)
        })

    }
    const checkWrong =async () => {
        await setWrong(true)
        await playAudio('/audio/SoundWrong.mp3').then(() => {
            setWrong(false)
        })
    }
    return {
        checkCorrect,
        checkWrong
    }
}