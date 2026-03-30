## URL Tracking Parameter Cleaner

Automatically removes common URL tracking parameters from the current page URL, keeping your browsing clean and your shared links free of tracking data.

## Features

- Removes unconditional tracking parameters (UTM, Google Click ID, Meta, LinkedIn, etc.)
- Removes conditional parameters (e.g. `ref`, `src`, `spm`) only on domains where they are known to be tracking-only
- Prevents infinite redirect loops by comparing old and new URL before replacing
- Lightweight — no external dependencies, runs entirely in-browser

## Removed Parameters

**Always removed:**
`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_type`, `gclid`, `wbraid`, `gbraid`, `fbclid`, `igshid`, `msclkid`, `yclid`, `mc_cid`, `mc_eid`, `dm_i`, `trk`, `trkContact`, `xmt`, `adgroupid`

**Removed on specific domains only:**
| Parameter | Domains |
|-----------|---------|
| `ref` | Facebook, Twitter/X, Instagram, YouTube, Reddit |
| `src`, `from` | Facebook, Twitter/X, Instagram |
| `spm` | Taobao, Tmall, AliExpress, Alibaba, 1688 |

## Notes

- `ref`, `src`, `from`, and `spm` are intentionally restricted to known domains to avoid breaking site functionality (e.g. GitHub uses `ref` for branch names)
- You can freely add or remove parameters and domains in the script source
