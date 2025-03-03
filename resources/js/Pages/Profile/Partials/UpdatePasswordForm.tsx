import { Form, Input, Button, Typography } from 'antd';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import './partials.css';

const { Title, Paragraph } = Typography;

export default function UpdatePasswordForm({ className = '' }: { className?: string }) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();
    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current?.focus();
        }
        if (errors.current_password) {
          reset('current_password');
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <section className={`${className} update-password-section`}>
      <div className="card update-password-card">
        <header className="update-password-header">
          <Title level={3}>Update Password</Title>
          <Paragraph>
            Ensure your account is using a long, random password to stay secure.
          </Paragraph>
        </header>

        <form onSubmit={updatePassword} className="update-password-form">
          <div className="form-item">
            <InputLabel htmlFor="current_password" value="Current Password" />
            <TextInput
              id="current_password"
              ref={currentPasswordInput}
              value={data.current_password}
              onChange={(e) => setData('current_password', e.target.value)}
              type="password"
              className="input-field"
              autoComplete="current-password"
            />
            <InputError message={errors.current_password} className="input-error" />
          </div>

          <div className="form-item">
            <InputLabel htmlFor="password" value="New Password" />
            <TextInput
              id="password"
              ref={passwordInput}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              type="password"
              className="input-field"
              autoComplete="new-password"
            />
            <InputError message={errors.password} className="input-error" />
          </div>

          <div className="form-item">
            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
            <TextInput
              id="password_confirmation"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              type="password"
              className="input-field"
              autoComplete="new-password"
            />
            <InputError message={errors.password_confirmation} className="input-error" />
          </div>

          <div className="update-password-actions">
            <PrimaryButton disabled={processing}>Save</PrimaryButton>
            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="saved-message">Saved.</p>
            </Transition>
          </div>
        </form>
      </div>
    </section>
  );
}
