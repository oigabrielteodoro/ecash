import React from 'react'
import { AnimatePresence } from 'framer-motion'
import truncate from 'lodash/truncate'

import { Avatar, Tooltip, ShimmerEffect, Popover } from 'ui'
import { useMe } from 'client'
import { useIsOpen } from 'core/layout'

import { AccountUserOptions } from './AccountUserOptions'

import * as S from './AccountUser.styled'

export function AccountUser() {
  const { user, isLoading } = useMe()
  const isOpen = useIsOpen()

  const likeBeCalled = truncate(user?.like_be_called, {
    length: 17,
  })
  const email = truncate(user?.email, {
    length: 20,
  })

  if (!isLoading && !user) {
    return null
  }

  return (
    <Popover
      name={user?.like_be_called}
      customWidth='20.2rem'
      innerContent={<AccountUserOptions />}
      wrapperStyle={{ marginTop: 'auto' }}
    >
      <S.Wrapper>
        <Tooltip disabled={isOpen} message={user?.like_be_called ?? ''}>
          <S.Container isOpen={isOpen}>
            <ShimmerEffect isLoading={isLoading} variant='image'>
              <Avatar src={user?.avatar_url} alt={user?.full_name} />
            </ShimmerEffect>
            <AnimatePresence>
              {isOpen && user && (
                <S.Content>
                  <ShimmerEffect isLoading={isLoading} count={2}>
                    <S.Title>{likeBeCalled}</S.Title>
                    <Tooltip message={user.email}>
                      <S.Email>{email}</S.Email>
                    </Tooltip>
                  </ShimmerEffect>
                </S.Content>
              )}
            </AnimatePresence>
          </S.Container>
        </Tooltip>
      </S.Wrapper>
    </Popover>
  )
}
