import type { Access } from 'payload'

/** Anyone can read published marketing content. */
export const publicRead: Access = () => true

/** Only logged-in admin users. */
export const loggedIn: Access = ({ req }) => Boolean(req.user)
