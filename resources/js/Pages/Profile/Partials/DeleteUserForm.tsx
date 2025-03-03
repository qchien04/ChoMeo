import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import './partials.css';

export default function DeleteUserForm({
  className = '',
}: {
  className?: string;
}) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({
    password: '',
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };

  return (
    <section className="delete-user-section">
    <header className="delete-user-header">
        <h2 className="delete-user-title">Delete Account</h2>
        <p className="delete-user-description">
        </p>
    </header>
    <div className="delete-user-button-container">
        <DangerButton onClick={confirmUserDeletion}>
        Delete Account
        </DangerButton>
    </div>
    <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <div className="delete-user-modal">
        <form className="delete-user-form" onSubmit={deleteUser}>
            <h2 className="modal-title">
            Are you sure you want to delete your account?
            </h2>
            <p className="modal-description">
            Once your account is deleted, all resources and data will be permanently removed. Please enter your password to confirm.
            </p>
            <div className="modal-input-container">
            <InputLabel htmlFor="password" value="Password" className="sr-only" />
            <TextInput
                id="password"
                type="password"
                name="password"
                ref={passwordInput}
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="modal-input"
                isFocused
                placeholder="Password"
            />
            <InputError message={errors.password} className="modal-input-error" />
            </div>
            <div className="modal-actions">
            <SecondaryButton onClick={closeModal}>
                Cancel
            </SecondaryButton>
            <DangerButton className="ml-3" disabled={processing}>
                Delete Account
            </DangerButton>
            </div>
        </form>
        </div>
    </Modal>
    </section>
  );
}
