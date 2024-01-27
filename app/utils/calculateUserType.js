
export function calculateUserType(pathname) {

    if (pathname === '/' || pathname === 'login ' || pathname ==='signup') {
      return null;
    }
     else if (pathname.includes('barbers')) {
      return 'barber';
    } else if (pathname.includes('clients')) {
      return 'client';
    }

  // Return null when window is undefined or for unknown URLs
  return null;
}
