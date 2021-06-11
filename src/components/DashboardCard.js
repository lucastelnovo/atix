import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const DashboardCard = ({ text }) => {
  return (
    <Card className="dashboardCard">
      <CardContent>
        <Typography variant="h5" component="h2">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
