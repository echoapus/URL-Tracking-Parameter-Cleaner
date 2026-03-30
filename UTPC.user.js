// ==UserScript==
// @name         URL Tracking Parameter Cleaner
// @namespace    https://github.com/echoapus/URL-Tracking-Parameter-Cleaner/
// @version      1.1
// @author       echoapus
// @description  Automatically removes common URL tracking parameters for privacy and clean sharing
// @match        *://*/*
// @license      MIT
// @homepageURL  https://github.com/echoapus/URL-Tracking-Parameter-Cleaner/
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // Unconditional removal: known tracking parameters
    const globalTrackingParams = [
        'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_type',
        'gclid', 'wbraid', 'gbraid',
        'fbclid', 'igshid',
        'msclkid', 'yclid',
        'mc_cid', 'mc_eid',
        'dm_i', 'trk', 'trkContact',
        'xmt', 'adgroupid'
    ];

    // Conditional removal: only remove on specified domains
    const conditionalParams = [
        {
            params: ['ref'],
            domains: ['facebook.com', 'twitter.com', 'x.com', 'instagram.com', 'youtube.com', 'reddit.com']
        },
        {
            params: ['src', 'from'],
            domains: ['facebook.com', 'twitter.com', 'x.com', 'instagram.com']
        },
        {
            params: ['spm'],
            domains: ['taobao.com', 'tmall.com', 'aliexpress.com', 'alibaba.com', '1688.com']
        }
    ];

    const url = new URL(window.location.href);
    const currentHost = url.hostname;
    let changed = false;

    // Remove unconditional tracking parameters
    globalTrackingParams.forEach(param => {
        if (url.searchParams.has(param)) {
            url.searchParams.delete(param);
            changed = true;
        }
    });

    // Remove conditional tracking parameters
    conditionalParams.forEach(({ params, domains }) => {
        const matched = domains.some(domain => currentHost === domain || currentHost.endsWith('.' + domain));
        if (matched) {
            params.forEach(param => {
                if (url.searchParams.has(param)) {
                    url.searchParams.delete(param);
                    changed = true;
                }
            });
        }
    });

    // Compare old and new URL before redirecting to prevent infinite redirect loops
    if (changed) {
        const cleanUrl =
            url.origin + url.pathname +
            (url.searchParams.toString() ? '?' + url.searchParams.toString() : '') +
            url.hash;

        if (cleanUrl !== window.location.href) {
            window.location.replace(cleanUrl);
        }
    }
})();
