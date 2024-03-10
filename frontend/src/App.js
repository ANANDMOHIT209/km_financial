// import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "./App.css";
// import Header from "./components/common/header/Header";
// import Footer from "./components/common/footer/Footer";
// import Home from "./components/home/Home";
// import About from "./components/about/About";
// import CourseHome from "./components/allcourses/CourseHome";
// import Team from "./components/team/Team";
// import Pricing from "./components/pricing/Pricing";
// import Blog from "./components/blog/Blog";
// import Contact from "./components/contact/Contact";
// import SignUp from "./components/register/SignUp";
// import SignIn from "./components/register/SignIn";
// import LoanForm from "./components/loan/LoanForm"; 
// import UserProfile from "./components/profile/UserProfile";

// function App() {
//   return (
//     <>
//       <Router forceRefresh={true}>
//         <Header />
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route exact path="/about" component={About} />
//           <Route exact path="/courses" component={CourseHome} />
//           <Route exact path="/team" component={Team} />
//           <Route exact path="/pricing" component={Pricing} />
//           <Route exact path="/journal" component={Blog} />
//           <Route exact path="/contact" component={Contact} />
//           <Route exact path="/signup" component={SignUp} />
//           <Route exact path="/signin" component={SignIn} />
//           <Route path="/profile" component={UserProfile} />
//           <Route exact path="/applyloan" component={LoanForm} />{" "}
//         </Switch>
//         <Footer />
//       </Router>
//     </>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import SignUp from "./components/register/SignUp";
import SignIn from "./components/register/SignIn";
import LoanForm from "./components/loan/LoanForm"; 
import ProfilePage from "./components/profile/UserProfile";
import LoanHistory from "./components/profile/Loan_profile";
import LoanDetails from "./components/loan/LoanDetail";
import UpdateLoanForm from "./components/loan/LoanUpdate";
import UpdateProfile from "./components/profile/UpdateProfile";
import { AuthProvider, useAuth } from './AuthContext'; // Import the context

function App() {
 return (
    <AuthProvider>
      <Router forceRefresh={true}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/courses" component={CourseHome} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/pricing" component={Pricing} />
          <Route exact path="/journal" component={Blog} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/loan-history" component={LoanHistory} />
          <Route exact path="/update_profile" component={UpdateProfile} />
          <Route  path="/loan/:loanId" component={LoanDetails} />
          <Route  path="/loan-update/:loanId" component={UpdateLoanForm} />
          <Route exact path="/applyloan" component={LoanForm} />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
 );
}

export default App;
