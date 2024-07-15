// import { NavLink } from "react-router-dom";
// import { UserDropdown } from "./UserDropdown";
// import "./Header.css";
// import Logo from "../../icons/billLogo2.png";

// export const Header = ({ showSidebar, setShowSidebar }) => {
//   const handleSidebarToggle = () => {
//     setShowSidebar(!showSidebar);
//   };

//   return (
//     <>
//       <div className="header-back"></div>
//       <header>
//         <div className="row mx-1">
//           <div className="d-flex justify-content-start col-6">
//             <div className="d-flex align-items-center p-1 gap-3">
//               <NavLink className="header-container-item header-nav-link header-nav-link-logo" to="/" onClick={() => setShowSidebar(false)}>
//                 <img src={Logo} alt="Logo" width={50} height={50} />
//               </NavLink>
//               <div className={`burger ${showSidebar ? 'open' : ''}`} onClick={handleSidebarToggle}>
//                 <span className="burgerLine"/>
//                 <span className="burgerLine"/>
//                 <span className="burgerLine"/>
//               </div>
//             </div>
//           </div>

//           <div className="d-flex justify-content-end col-6">
//             <div className="d-flex align-items-center px-sm-2 header-item-wrapper hide-small">
//               <NavLink className="header-nav-link hide-small" to="/contact">Contact</NavLink>
//             </div>

//             <div className="d-flex align-items-center px-2 header-item-wrapper">
//               <UserDropdown setShowSidebar={setShowSidebar}/>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };
// export default Header;
