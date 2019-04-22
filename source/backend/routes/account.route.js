// Built-in packages

// Installed packages

// Internal packages
import { Router } from '../core';

let auth_routes = router.register_routes([{
    url: '/account/rating',
    method: 'GET',
    controller: AccountRatingController,
    handler: AccountRatingController.get_account_rating_by_id,
    multiple: false,
    auth: true,
    schema: ''
},
{
    url: '/account/rating',
    method: 'POST',
    controller: AccountRatingController,
    handler: AccountRatingController.create_account_rating,
    multiple: false,
    validate_data: true,
    auth: true,
    schema: ''
},
{
    url: '/account/rating/:id',
    method: 'DELETE',
    controller: AccountRatingController,
    handler: AccountRatingController.delete_account_rating,
    multiple: false,
    auth: true,
    schema: ''
}]);

export {
    auth_routes
}