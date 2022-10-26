import Header from "./header";
import SideMenu from "./header/Sidebar";
import Footer from "./footer";

const WebLayout = (props) => {
  return (
    <>
      <Header />
      <SideMenu />
      <div className="flames" />
      { props.children }
      <Footer />
    </>
  )
}

export default WebLayout;