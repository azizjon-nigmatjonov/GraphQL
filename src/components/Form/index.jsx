import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_USER, UPDATE_USER } from '../../GraphQL/Mutations'
import { useQuery } from '@apollo/client'
import { GET_USER_LIST } from '../../GraphQL/Queries'
import { useEffect, useState } from 'react'

function Form () {
    const navigate = useNavigate()
    const { id, status } = useParams();
    const [createUser, {}] = useMutation(CREATE_USER)
    const [updateUser, {}] = useMutation(UPDATE_USER)
    const {data} = useQuery(GET_USER_LIST)
    const [user, setUser] = useState()

    const CreatOrUpdate = (values) => {
        if (status === "create") {
            createUser({
                variables: values
            }).then(() => back())
        } else {            
            updateUser({
                variables: {
                    id: id,
                    name: values?.name ? values?.name : user?.name,
                    age: values?.age ? values?.age : user?.age,
                    gender: values?.gender ? values?.gender : user?.gender,
                    phone: values?.phone ? values?.phone : user?.phone
                }
            }).then(() => back())
        }
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: user?.name ?? "",
            gender: user?.gender ?? "",
            age: user?.age ?? "",
            phone: user?.phone ?? ""
        },
        onSubmit: (values) => {
            CreatOrUpdate(values)
        }
    })

    const back = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (data?.allUsers) {
            const user = data?.allUsers.find((user) => user.id === id)
            setUser(user)
        }
    }, [data])

    return (
        <div className='wrapper'>
            <form 
                className='Form' 
                onSubmit={formik.handleSubmit}
                >
                    <input
                        id={"name"}
                        onChange={formik.handleChange}
                        name="name"
                        type="text"
                        value={formik.values.name}
                        placeholder="User name"
                        className='form-input'
                    />
                     <input
                        id={"age"}
                        onChange={formik.handleChange}
                        name="age"
                        type="number"
                        value={formik.values.age}
                        placeholder="User age"
                        className='form-input'
                    />
                    <input
                        id={"gender"}
                        onChange={formik.handleChange}
                        name="gender"
                        type="text"
                        value={formik.values.gender}
                        placeholder="User gender"
                        className='form-input'
                    />
                     <input
                        id={"phone"}
                        onChange={formik.handleChange}
                        name="phone"
                        type="text"
                        value={formik.values.phone}
                        placeholder="User phone"
                        className='form-input'
                    />
                

                <button type='submit' className='btn' style={{ marginTop: '20px' }}>
                    Send data
                </button>
                <button onClick={back} type='button' className='btn-cancel' style={{ marginTop: '20px' }}>
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default Form