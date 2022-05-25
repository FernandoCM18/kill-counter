import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { GroupPage } from '../pages/GroupPage';
import { UserPage } from '../pages/UserPage';
import { AddGroupPage } from '../pages/AddGroupPage';
import { AddPersonToGroupPage } from '../pages/AddPersonToGroupPage';
import { Navbar } from '../components/Navbar';
import { AddKillsToGroup } from '../pages/AddKillsToGroup';
import { EditProfilePage } from '../pages/EditProfilePage';

export const KillCounterRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/group/:id" element={<GroupPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/settings" element={<UserPage />} />
        <Route path="/addGroup" element={<AddGroupPage />} />
        <Route path="/addPersonToGroup/:id" element={<AddPersonToGroupPage />} />
        <Route path="/addKillsToGroup/:id" element={<AddKillsToGroup />} />
        <Route path="/editProfile" element={<EditProfilePage />} />
      </Routes>
      <Navbar />
    </>
  )
}
