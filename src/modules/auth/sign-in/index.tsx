import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResetRecoilState } from 'recoil';

import { login } from '@/api/auth.service';
import HidePassword from '@/assets/images/hide-password.png';
import ViewPassword from '@/assets/images/view-password.png';
import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';
import Label from '@/components/CustomLabel';
import InputError from '@/components/InputError';
import { setRefreshToken, setToken } from '@/helpers/storage';
import {
  branchState,
  orderActiveState,
  orderState,
  productImportState,
} from '@/recoil/state';

import { schema } from './schema';

export function SignIn() {
  const resetBranch = useResetRecoilState(branchState);
  const resetOrderObject = useResetRecoilState(orderState);
  const resetOrderActive = useResetRecoilState(orderActiveState);
  const resetProductsImport = useResetRecoilState(productImportState);

  const [isHidePassword, setIsHidePassword] = useState(true);

  const router = useRouter();

  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { mutate: mutateSignIn, isLoading } = useMutation(
    () => login(getValues()),
    {
      onSuccess(data) {
        setToken(data.data.accessToken.token);
        setRefreshToken(data.data.refreshToken.token);

        message.success('Đăng nhập thành công!', 1);
        setTimeout(() => {
          router.push('/');
        }, 1000);
      },
      onError(err: any) {
        message.error(err?.message);
      },
    }
  );

  const onSubmit = () => {
    mutateSignIn();
  };

  useEffect(() => {
    setToken('');
    setRefreshToken('');
    resetBranch();
    resetOrderObject();
    resetOrderActive();
    resetProductsImport();
  }, []);

  return (
    <div className=" mx-auto flex max-w-[850px] flex-col items-center justify-center py-[65px]">
      <div className="mb-[50px] text-center">
        <Image src={"/logo.png"} width={150} height={150} />
      </div>



      <div className="w-full max-w-[400px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label label="Tên đăng nhập" hasInfoIcon={false} />
            <CustomInput
              className="h-11"
              placeholder="Tên đăng nhập"
              onChange={(e) => setValue('username', e, { shouldValidate: true })}
            />
            <InputError error={errors.username?.message} />
          </div>

          <div className="mb-4">
            <Label label="Mật khẩu" hasInfoIcon={false} />
            <CustomInput
              type={isHidePassword ? 'password' : 'text'}
              className="h-11"
              placeholder="Mật khẩu"
              onChange={(e) => setValue('password', e, { shouldValidate: true })}
              suffixIcon={
                <Image
                  src={isHidePassword ? HidePassword : ViewPassword}
                  alt=""
                  onClick={() => setIsHidePassword((pre) => !pre)}
                  width={16}
                  height={16}
                  className=" cursor-pointer"
                />
              }
            />
            <InputError error={errors.password?.message} />
          </div>

          <div className="mb-4">
            <CustomButton
              className="!h-11 w-full"
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              loading={isLoading}
            >
              Đăng nhập
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
