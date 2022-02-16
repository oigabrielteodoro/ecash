import React from 'react'
import { FiDollarSign } from 'react-icons/fi'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Input, Select } from 'ui'
import {
  CreateAccountStoreState,
  setState,
  useCreateAccount,
} from '../useCreateAccount'

import * as S from './Profile.styled'

type FormParams = Required<
  Pick<CreateAccountStoreState, 'monthly_income' | 'financial_objective'>
>

const schema = yup.object().shape({
  monthly_income: yup.string().required('Monthly income is a required field'),
  financial_objective: yup
    .string()
    .required('Financial objective is a required field'),
})

export function Profile() {
  const { monthly_income, financial_objective } = useCreateAccount()
  const form = useForm<FormParams>({
    defaultValues: {
      monthly_income,
      financial_objective,
    },
    resolver: yupResolver(schema),
  })

  const {
    formState: { errors, touchedFields },
    handleSubmit,
  } = form

  const isFilled = !!monthly_income || !!financial_objective
  const isErrored = !!errors?.monthly_income || !!errors?.financial_objective
  const isTouched =
    touchedFields.monthly_income || touchedFields.financial_objective
  const isDisabled = (!isTouched && !isFilled) || isErrored

  async function handleOnSubmit(params: FormParams) {
    console.log(params)

    setState(params)
  }

  return (
    <FormProvider {...form}>
      <strong>A little more about you...</strong>
      <p>We need a little more information to boost your financial life</p>
      <S.Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Input
          name='monthly_income'
          label='Monthly income'
          icon={FiDollarSign}
          placeholder='Ex. R$ 1.000,00'
          error={errors.monthly_income?.message}
        />
        <Select
          name='financial_objective'
          label='Financial objective'
          placeholder='Ex. Make extra income'
          error={errors.financial_objective?.message}
        >
          <Select.Option value='teste_1'>Teste 1</Select.Option>
          <Select.Option value='teste_2'>Teste 2</Select.Option>
        </Select>
        <Button size='lg' disabled={isDisabled}>
          Confirm your profile
        </Button>
      </S.Form>
    </FormProvider>
  )
}
