import { Order, SocialUser, Store, POSEmployee } from '../types';

const API_BASE_URL = 'https://api.clover.com/v3/merchants';

export async function printOrder(order: Order, store: Store) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/${store.id}/print_event`,
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${store.accessToken}`,
                },
                body: JSON.stringify({
                    orderRef: { id: order.id },
                }),
            }
        );
        if (response.ok) {
            alert('Print event sent!');
        } else {
            alert('Print failed');
        }
    } catch (e) {
        alert('Print error');
    }
}

export function hasUnprintedItems(order: Order): boolean {
    return (order.lineItems?.elements || []).some(item => !item.printed);
}

export async function fetchOrders(store: Store, selectedState: string, employee : POSEmployee): Promise<Order[]> {
    if (!store || !store.id || !store.employeeId || !store.accessToken) {
        console.error('Invalid store data provided to fetchOrders');
        return [];
    }

    try {
        const url = `${API_BASE_URL}/${store.id}/orders?filter=employee.id%3D${employee.id}&expand=lineItems${selectedState}`;
        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${store.accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        const json = await response.json();
        return json.elements || [];
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

export async function getEmployeeData(socialuser: SocialUser, store: Store): Promise<POSEmployee | null> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/${store.id}/employees?filter=email=${socialuser.email}`,
            {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${store.accessToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();

        // Check if the employee was found
        if (data.elements && data.elements.length > 0) {
            // Employee found, you can get their ID and other details here
            const employee = data.elements[0];
            console.log('Employee found:', employee);
            return employee;
        } else {
            // Employee not found, show the error message
            alert(`Your email ${socialuser.email} is not exist in restaurant POS`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching employee data:', error);
        alert('An error occurred while trying to find your employee data.');
        return null;
    }
}