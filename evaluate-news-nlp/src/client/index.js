const dotenv = require('dotenv');
dotenv.config();

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

var aylien = require("aylien_textapi");

var textapi = new aylien({
    application_id: "your-api-id",
    application_key: "your-key"
});


