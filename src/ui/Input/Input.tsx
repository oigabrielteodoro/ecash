import React, {
  useState,
  InputHTMLAttributes,
  ComponentType,
  forwardRef,
  ForwardRefRenderFunction,
  FocusEvent,
  KeyboardEvent,
} from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

import capitalize from 'lodash/capitalize'

import type { IconBaseProps } from 'react-icons'

import * as S from './Input.styled'

type Props = {
  label: string
  error?: string
  icon: ComponentType<IconBaseProps>
} & InputHTMLAttributes<HTMLInputElement>

const ForwardInput: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    id,
    defaultValue,
    label,
    error,
    icon: Icon,
    onBlur,
    onFocus,
    onKeyDown,
    ...rest
  },
  ref,
) => {
  const [isFilled, setIsFilled] = useState(!!defaultValue)
  const [isFocused, setIsFocused] = useState(false)

  const isErrored = !!error

  const errorMessage = error ? capitalize(error) : ''

  function handleOnKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!onKeyDown) return

    if (event.key === 'Enter') {
      onKeyDown(event)
    }
  }

  function handleOnBlur(event: FocusEvent<HTMLInputElement>) {
    event.preventDefault()

    setIsFocused(false)
    setIsFilled(!!event.target.value)

    onBlur && onBlur(event)
  }

  function handleOnFocus(event: FocusEvent<HTMLInputElement>) {
    setIsFocused(true)
    setIsFilled(!!event.target.value)

    onFocus && onFocus(event)
  }

  return (
    <S.Wrapper>
      <label htmlFor={id}>{label}</label>
      <S.Container
        isFilled={isFilled}
        isFocused={isFocused}
        isErrored={isErrored}
      >
        <input
          id={id}
          ref={ref}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onKeyDown={handleOnKeyDown}
          {...rest}
        />
        {Icon && <Icon size={22} />}
      </S.Container>
      {error && (
        <S.ErrorContainer>
          <AiOutlineExclamationCircle size={18} />
          <span>{errorMessage}</span>
        </S.ErrorContainer>
      )}
    </S.Wrapper>
  )
}

export const Input = forwardRef(ForwardInput)
