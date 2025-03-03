import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import "./Partials/partials.css";
import HomeLayout from '@/Layouts/HomeLayout';


export default function Edit({
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <HomeLayout>
      <Head title="Profile" />

      <div className="edit-page-container">
        <div className="left-column">
          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
            className="max-w-xl"
          />
        </div>

        <div className="right-column">
          <UpdatePasswordForm />
          <DeleteUserForm />
        </div>
      </div>
    </HomeLayout>
  );
}
