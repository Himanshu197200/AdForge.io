import { Box, Typography, Container, Grid, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: '#f8fafc', py: 6, mt: 'auto', borderTop: '1px solid #e2e8f0' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                            NST Events
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Connecting students with opportunities. The best platform to host and participate in college events, hackathons, and workshops.
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            Platform
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="#" color="inherit" underline="hover" variant="body2">Browse Events</Link>
                            <Link href="#" color="inherit" underline="hover" variant="body2">Organize</Link>
                            <Link href="#" color="inherit" underline="hover" variant="body2">Dashboard</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            Support
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="#" color="inherit" underline="hover" variant="body2">Help Center</Link>
                            <Link href="#" color="inherit" underline="hover" variant="body2">Terms of Service</Link>
                            <Link href="#" color="inherit" underline="hover" variant="body2">Privacy Policy</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            Connect with us
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Facebook size={20} className="text-gray-500 hover:text-primary-600 cursor-pointer" />
                            <Twitter size={20} className="text-gray-500 hover:text-primary-600 cursor-pointer" />
                            <Instagram size={20} className="text-gray-500 hover:text-primary-600 cursor-pointer" />
                            <Linkedin size={20} className="text-gray-500 hover:text-primary-600 cursor-pointer" />
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} NST Events. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
