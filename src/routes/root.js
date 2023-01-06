import { Link, Outlet } from 'react-router-dom'

export const Root = () => {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li><Link to=''>Home</Link></li>
            <li><Link to='super-heroes'>Traditional Super Heroes</Link></li>
            <li><Link to='rq-super-heroes'>RQ Super Heroes</Link></li>
          </ul>
        </nav>
      </div>
      <div id='detail'>
        <Outlet />
      </div>
    </>
  )
}
