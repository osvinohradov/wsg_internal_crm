import { router as train_ctrl } from './train_ctrl';
import { router as group_invoice_ctrl} from './group_invoice_ctrl';

//Services
import { router as user_ctrl } from './user_ctrl';
import { router as organization_ctrl } from './organization_ctrl';

// References
import * as References from './references';


export {
    References,
    train_ctrl,
    group_invoice_ctrl,

    // Services
    user_ctrl,
    organization_ctrl
}