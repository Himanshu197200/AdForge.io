const prisma = require('../utils/prisma');

exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;

        let stats = {};

        if (role === 'ORGANIZER' || role === 'ADMIN') {
            // Organizer stats
            const totalEvents = await prisma.event.count({
                where: role === 'ORGANIZER' ? { organizerId: userId } : {}
            });

            const totalRegistrations = await prisma.registration.count({
                where: role === 'ORGANIZER' ? { event: { organizerId: userId } } : {}
            });

            const events = await prisma.event.findMany({
                where: role === 'ORGANIZER' ? { organizerId: userId } : {},
                include: {
                    _count: {
                        select: { registrations: true, feedbacks: true }
                    },
                    feedbacks: {
                        select: { rating: true }
                    }
                }
            });

            const avgRating = events.reduce((acc, event) => {
                const eventAvg = event.feedbacks.length > 0
                    ? event.feedbacks.reduce((sum, f) => sum + f.rating, 0) / event.feedbacks.length
                    : 0;
                return acc + eventAvg;
            }, 0) / (events.length || 1);

            stats = {
                totalEvents,
                totalRegistrations,
                avgRating: avgRating.toFixed(1),
                events: events.map(e => ({
                    title: e.title,
                    registrations: e._count.registrations,
                    feedbacks: e._count.feedbacks
                }))
            };
        } else {
            // Student stats
            const registrations = await prisma.registration.count({
                where: { userId }
            });
            const attended = await prisma.registration.count({
                where: { userId, hasAttended: true }
            });

            stats = {
                registrations,
                attended
            };
        }

        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch stats' });
    }
};
