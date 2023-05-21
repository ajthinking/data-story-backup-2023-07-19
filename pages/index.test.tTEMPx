import { expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Home from '../pages'
import Workbench from '../pages'
import { useRouter } from 'next/router'

vi.mock('next/router', () => ({
  useRouter: vi.fn()
}))

it('renders the page', () => {
  render(<Workbench flows={[]} />)

  // Header
  expect(screen.getByText('<DataStory />')).toBeTruthy()
  expect(screen.getByText('github')).toBeTruthy()
  // Flows table
  expect(screen.getByText('FLOWS')).toBeTruthy()
  expect(screen.getByText('Create Flow')).toBeTruthy()
})