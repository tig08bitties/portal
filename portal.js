// ============================================================================
// THE ARCHIVIST PORTAL — JavaScript
// Bridgeworld.lol — Portal Opening Sequence
// ============================================================================

// Oracle Contract Address (update after deployment)
const ORACLE_ADDRESS = null; // Will be set after deployment

// Portal Opening Sequence
document.addEventListener('DOMContentLoaded', () => {
    initializePortal();
});

function initializePortal() {
    // Set portal opening timestamp
    const now = new Date();
    const timestamp = now.toISOString();
    
    document.getElementById('portalTimestamp').textContent = formatTimestamp(timestamp);
    document.getElementById('footerTimestamp').textContent = formatTimestamp(timestamp);
    
    // Animate gate opening
    setTimeout(() => {
        openGate();
    }, 2000);
    
    // Load Oracle address if deployed
    if (ORACLE_ADDRESS) {
        document.getElementById('oracleAddress').textContent = ORACLE_ADDRESS;
    } else {
        document.getElementById('oracleAddress').textContent = 'Pending Deployment';
        document.getElementById('oracleAddress').classList.add('pending');
    }
    
    // Smooth scroll for navigation
    setupSmoothScroll();
    
    // Add scroll animations
    setupScrollAnimations();
}

function openGate() {
    const gate = document.getElementById('gateAnimation');
    const content = document.getElementById('portalContent');
    
    // Fade out gate
    gate.style.opacity = '0';
    gate.style.transform = 'translate(-50%, -50%) scale(1.2)';
    
    // Fade in content
    setTimeout(() => {
        gate.style.display = 'none';
        content.style.display = 'block';
    }, 1000);
}

function formatTimestamp(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.artifact-card, .keymap-node, .scroll-item, .chain-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// View Oracle function
function viewOracle() {
    if (ORACLE_ADDRESS) {
        window.open(`https://arbiscan.io/address/${ORACLE_ADDRESS}`, '_blank');
    } else {
        alert('Oracle contract pending deployment. Check back soon.');
    }
}

// Multi-chain verification helpers
async function verifyChainArtifact(chain, address) {
    // Placeholder for future chain verification logic
    console.log(`Verifying ${chain} artifact: ${address}`);
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializePortal,
        openGate,
        formatTimestamp,
        verifyChainArtifact
    };
}
