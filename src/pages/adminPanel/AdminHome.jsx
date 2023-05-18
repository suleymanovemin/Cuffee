import {connect} from "react-redux"
function AdminHome({user}) {
  return <div>AdminHome
    <h4>Xoş Gəldiz ({user.email})</h4>
  </div>;
}
const t = (a) => a;
export default connect(t)(AdminHome);
