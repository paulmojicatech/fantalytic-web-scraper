#!/usr/bin/env node

import { getSiteContent } from '../http/http.service';

getSiteContent().then(res => console.log('RES', res));
