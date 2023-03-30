import Form from './Form'
import { render, screen } from '@testing-library/react'

it('should render', () => {
    render(<Form />)
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument() //react testing library query, for form field getByLabelText
})

//still need to add expect matchers (vite test set up file) https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/
//add in import lines (figure out where they need to be)
//configure vit config to load that 
//we are expected an input field w an 

//+ test user interactions (need user event from testing library)
//vite test and react testing library