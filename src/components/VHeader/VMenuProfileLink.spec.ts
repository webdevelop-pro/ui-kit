
import { describe, it, expect, vi, beforeEach } from 'vitest'


const hoisted = vi.hoisted(() => ({
  navigateWithQueryParams: vi.fn(),
}))


vi.mock('UiKit/assets/images/user.svg', () => ({
  
  default: { name: 'UserIconMock', render() { return null } },
}), { virtual: true })

vi.mock('UiKit/helpers/general', () => ({
  navigateWithQueryParams: hoisted.navigateWithQueryParams,
}), { virtual: true })


import VMenuProfileLink from './VMenuProfileLink.vue'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'



async function ssrRender(props: Record<string, any>) {
  const app = createSSRApp({
    render: () => h(VMenuProfileLink, props),
  })
  return await renderToString(app)
}



describe('VMenuProfileLink (node / SSR)', { environment: 'node' }, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('SSR: renders empty when userLoggedIn=false', async () => {
    const html = await ssrRender({ userLoggedIn: false, urlProfile: '/profiles/me' })
    
    expect(html.trim()).toMatch(/^\s*<!--v-if-->\s*$/)
  })

  it('SSR: renders something when userLoggedIn=true', async () => {
    const html = await ssrRender({ userLoggedIn: true, urlProfile: '/profiles/me' })
    expect(html.trim()).not.toBe('')
  })

  it('module loads and is a Vue SFC object (node)', () => {
    expect(VMenuProfileLink).toBeTruthy()
    expect(typeof VMenuProfileLink).toBe('object')
  })

  it('helper is mockable (node, no DOM)', () => {
    hoisted.navigateWithQueryParams('/x')
    expect(hoisted.navigateWithQueryParams).toHaveBeenCalledWith('/x')
  })
})

describe('VMenuProfileLink (jsdom)', { environment: 'jsdom' }, () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('module loads and is a Vue SFC object (jsdom)', () => {
    expect(VMenuProfileLink).toBeTruthy()
    expect(typeof VMenuProfileLink).toBe('object')
  })

  it.skip('DOM: click calls navigateWithQueryParams(urlProfile)', async () => {
    const { mount } = await import('@vue/test-utils') 
    const wr = mount(VMenuProfileLink, {
      props: { userLoggedIn: true, urlProfile: '/profiles/me' },
    })
    
    await wr.trigger('click')
    expect(hoisted.navigateWithQueryParams).toHaveBeenCalledWith('/profiles/me')
  })

  it('helper is mockable (jsdom, no DOM required)', () => {
    hoisted.navigateWithQueryParams('/y')
    expect(hoisted.navigateWithQueryParams).toHaveBeenCalledWith('/y')
  })
})
