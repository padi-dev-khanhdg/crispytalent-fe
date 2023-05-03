import { NextComponentType } from 'next'
import React, { useState, useCallback, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useModal } from 'src/hooks/useModal';
import { useForm, Controller } from "react-hook-form";
import { Checkbox, Input, Select, Tooltip, DatePicker } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useRecoilValue } from 'recoil';
import { listGameState } from 'src/recoil/listGameState';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DoneIcon from '@mui/icons-material/Done';
import { useCreateAssessment } from 'src/hooks/useCreateAssessment';
const { Option } = Select
const { RangePicker } = DatePicker;
const CreateAssessment: NextComponentType = () => {
    const { closeModal } = useModal();
    return (
        <div className='w-726px'>
            <div className='flex items-center justify-between mb-10'>
                <h1 className='poppinsSemibold text-32px mb-0'>Create new assessment</h1>
                <button className='w-10 h-10 bg-white-200 rounded-full' onClick={closeModal}><CloseIcon /></button>
            </div>
            <FormCreateAssessment />
        </div>
    )
}
export default CreateAssessment
const listLevel =  [
    'C-level executive',
    'Director',
    'Manager',
    'Junior / Trainee',
    'Intern',
]
const listPosition = ["Developer", "Quality control", "Accounting", "Product Owner", "Talent Acquisition", "Other"]
interface IFormValue {
    name: string,
    game: { game_id: number, option: string | null }[],
    job_function: string,
    job_position: string,
    start_date: string,
    end_date: string
}
interface IHiringPosition {
    popup: boolean,

}
interface IListTest {
    open:boolean
    changeCheckout: number[],
    showValue: number[],
}
const FormCreateAssessment: NextComponentType = () => {
    const {closeModal}=useModal()
    const { createASS } = useCreateAssessment()
    const [showOtherPosition, setShowOtherPosition] = useState<boolean>(false)
    const [listTest, setListTest] = useState<IListTest>({ open:false,changeCheckout: [], showValue: [] })
    const [hiringPosition, setHiringPosition] = useState<IHiringPosition>({ popup: false})
    useEffect(() => {
        const closePopup = () => {
            setHiringPosition({ ...hiringPosition, popup: false })
        }
        window.addEventListener("mouseup", closePopup)
        return () => {
            window.removeEventListener("mouseup", closePopup)
        }
    }, [])
    const listGame = useRecoilValue(listGameState)
    const { reset,getValues,setValue, handleSubmit, clearErrors, control, formState: { errors } } = useForm<IFormValue>({ mode: "onChange" });
    const onSubmit = async (data: IFormValue) => {
        reset()
        await  setListTest({changeCheckout:[],open:false,showValue:[]})
        createASS(data)
        closeModal()
    }
    const handleChangeCalendar = (date: any, dateStrings: string[]) => {
        setValue("start_date", dateStrings[0])
        setValue("end_date", dateStrings[1])
    }
    const customDropdownListTest = useCallback(() => {
        const formatData = () => {
            return listTest.changeCheckout.map((id) => {
                return {
                    game_id: id,
                    option: null
                }
            })
        }
        const onChangeCheckBox = (e: CheckboxChangeEvent) => {
            const { value, checked } = e.target;
            if (checked) {
                setListTest({ ...listTest, changeCheckout: [...listTest?.changeCheckout, value], showValue: [...listTest.showValue] })
            } else {
                const arr = listTest.changeCheckout.filter(id => id !== value)
                setListTest({ ...listTest, changeCheckout: arr, showValue: [...listTest.showValue] })
            }
        }
        const renderListGame = () => {
            return listGame.map((game, index) => {
                const { id, name } = game
                return <Checkbox.Group key={index}>
                    <Checkbox value={id} className="poppinsRegular capitalize" onChange={onChangeCheckBox}>{name}</Checkbox>
                </Checkbox.Group>
            })
        }
        return <div>
            <p className='poppinsRegular text-ink-100 mb-3'>Choose tests for your assessmentes</p>
            <div className='flex flex-col gap-3'>
                {renderListGame()}
            </div>
            <button className='mt-3 w-full py-2.5 poppinsMedium bg-primary-500 text-white-500 rounded-lg' onClick={() => { setValue('game', formatData()); setListTest({ ...listTest, open:false,showValue: listTest.changeCheckout }); clearErrors("game") }}>Save</button>
        </div>
    }, [listTest.changeCheckout, listTest.showValue,listTest.open])
    const customDropdownPosition = useCallback(() => {
        const menuLevel = () => {
            return listLevel.map((level, index) => {
                const check = level === getValues("job_position") ? <DoneIcon /> : ""
                return <div key={index} className='flex items-center justify-between p-4 text-ink-500 cursor-pointer poppinsRegular hover:bg-blue-100 focus:bg-blue-100' onClick={() => {  setHiringPosition({ ...hiringPosition, popup: false }); setValue("job_position",level); clearErrors('job_position'); setShowOtherPosition(false); }}>
                    <span>{level}</span><span className='text-ink-100'>{check}</span>
                </div>
            })
        }
        return <div >
            {listPosition.map((position, indexs) => {
                const { popup } = hiringPosition
                const background = position === getValues("job_function") ? "bg-blue-100" : ""
                if (position === "Other") {
                    return <div key={indexs} className={`relative p-4 cursor-pointer hover:bg-blue-100 overflow-hidden ${background}`}  >
                        <div className='flex items-center justify-between poppinsRegular text-ink-500' onClick={() => { setHiringPosition({...hiringPosition,});setValue("job_function",position);  setShowOtherPosition(true) }}><span>{position}</span></div>
                    </div>
                }
                return <div key={indexs} className={`relative p-4 cursor-pointer hover:bg-blue-100 overflow-hidden ${background}`}  >
                    <Tooltip placement="rightTop" arrowPointAtCenter={true} open={(getValues("job_function") === position && popup) ? true : false} overlayClassName="tooltip-level" color='white' trigger="click" title={<div >{menuLevel()}</div>}>
                        <div className='flex items-center justify-between poppinsRegular text-ink-500' onClick={() => { setHiringPosition({ ...hiringPosition, popup: true, });setValue("job_function",position) }}><span>{position}</span><KeyboardArrowRightIcon /></div>
                    </Tooltip>
                </div>
            })}
        </div>
    }, [hiringPosition])
    const customTag = (props: any): any => {
        return listGame.map((game, index) => {
            if (game.id === props.value) {
                return <div key={index} className='poppinsRegular'>{game.name},</div>
            }
        })


    }
    return <form className='w-400px' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
            <h4 className='poppinsMedium text-ink-500 mb-1'>Your assessment name <span className='text-red-500'>*</span></h4>
            <Controller
                control={control}
                name="name"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        className='custom-input poppinsRegular'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
            <span className='poppinsMedium text-red-500'>{errors.name ? "Complete this field to create assessment" : ""}</span>
        </div>
        <div className='mb-6'>
            <h4 className='poppinsMedium text-ink-500 mb-1'>List test <span className='text-red-500'>*</span></h4>
            <Controller
                control={control}
                name="game"
                rules={{ required: "List test is required!" }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Select className='poppinsRegular' placeholder="List of test" mode='multiple' open={listTest.open} showSearch={false} showArrow={true} value={listTest.showValue} dropdownRender={customDropdownListTest} tagRender={customTag} onChange={onChange} onFocus={()=>{setListTest({...listTest,open:true})}}>
                    </Select>
                )}
            />
            <span className='poppinsMedium text-red-500'>{errors.game ? "Complete this field to create assessment" : ""}</span>
        </div>
        <div className='mb-6'>
            <h4 className='poppinsMedium text-ink-500 mb-1'>Hiring position <span className='text-red-500'>*</span></h4>
            <Controller
                control={control}
                name="job_position"
                rules={{ required: "List test is required!" }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Select className='poppinsRegular' popupClassName='select-dropdown-position' placeholder="Choose job role" showSearch={false} showArrow={true} value={value?`${getValues("job_function")}-${getValues("job_position")}`:""} dropdownRender={customDropdownPosition} onChange={onChange} ></Select>
                )}
            />
            <span className='poppinsMedium text-red-500'>{errors.job_position ? "Complete this field to create assessment" : ""}</span>
        </div>
        <div className={`mb-6 ${showOtherPosition ? 'block' : "hidden"}`}>
            <h4 className='poppinsMedium text-ink-500 mb-1'>Specify “Other” position</h4>
            <Controller
                control={control}
                name="job_position"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        className='custom-input poppinsRegular'
                        placeholder='example: Sales - Senior Excutive'
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
        </div>
        <div className='mb-10'>
            <h4 className='poppinsMedium text-ink-500 mb-1'>Assessment date </h4>
            <Controller
                control={control}
                name="name"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <RangePicker showTime format="DD-MM-YYYY HH:mm:ss" placeholder={["Start", "End"]} onCalendarChange={handleChangeCalendar} />
                )}
            />

        </div>
        <button className='w-full py-2.5 poppinsMedium bg-primary-500 text-white-500 rounded-lg outline-none'>Create</button>
    </form>
}