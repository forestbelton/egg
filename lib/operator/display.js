import { op } from './_util'

export default op('d', [
    {
        sig: ['any'],
        body: (context, token) => {
            context.displayToken(token)
        }
    }
])