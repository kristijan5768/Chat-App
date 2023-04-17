import { firstName, lastName } from '..//constants/names';

function randomName() {
    const randomFirstName =
        firstName[Math.floor(Math.random() * firstName.length)];
    const randomLastName =
        lastName[Math.floor(Math.random() * lastName.length)];
    return randomFirstName + ' ' + randomLastName;
}

export default randomName;
