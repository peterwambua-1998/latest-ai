import SideNav from '../sidenav';


export default function Layout({ children }) {
  return (
    <div>
      <SideNav />
      <div className="">{children}</div>
    </div>
  )
}
