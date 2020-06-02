import { double } from './aa'
it('testando função que dobra valor', () => {
  const NUMBER_FOR_TEST = 10
  const NUMBER_EXPECTED = 20
  expect(double(NUMBER_FOR_TEST)).toBe(NUMBER_EXPECTED)
})
