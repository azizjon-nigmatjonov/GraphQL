import { useNavigate } from 'react-router-dom'

function Header () {
    const navigate = useNavigate()
    const navigateToorm = () => navigate(`/form/create`)

    return (
        <div className="Header">
            <button onClick={navigateToorm} className="btn">Add user</button>
        </div>
    )
}

export default Header