import Registration from "./components/registrationForm";
import Header from "./components/Header";
import { ToastMessageContainer } from "./components/ToastMessage";
import Addsurgery from "./components.addSurgery";

function App() {
  return (
    <>
      <Header></Header>
      <Registration></Registration>
      <ToastMessageContainer />
      <Addsurgery></Addsurgery>
    </>
  );
}

export default App;
