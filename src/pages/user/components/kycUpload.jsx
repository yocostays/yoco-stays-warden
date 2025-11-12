import { FormProvider } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import aadhaar from "../../../assets/blankImages/addhar_card.png";
import driving from "../../../assets/blankImages/driving_licence.png";
import passport from "../../../assets/blankImages/passport.png";
import pan from "../../../assets/blankImages/pen_card.png";
import voter from "../../../assets/blankImages/voter_id.png";
import PropTypes from "prop-types";
import KycUploadCard from "./custom/customKycUpload";

KycUpload.propTypes = {
  methods: PropTypes.object.isRequired,
  verified: PropTypes.bool, // Form methods passed from the parent.
  id: PropTypes.string, // Form methods passed from the parent.
  isKycFrom: PropTypes.string, // Form methods passed from the parent.
};

export default function KycUpload({ methods, verified, id , isKycFrom }) {
  const { handleSubmit ,register,errors} = methods;

  const initialDocuments = [
    { id: 1, name: "aadhaar", imageName: "Aadhaar Card", image: aadhaar },
    { id: 2, name: "voterId", imageName: "Voter Card", image: voter },
    { id: 3, name: "passport", imageName: "Passport", image: passport },
    {
      id: 4,
      name: "drivingLicense",
      imageName: "Driving License",
      image: driving,
    },
    { id: 5, name: "pancard", imageName: "PAN Card", image: pan },
  ];

  return (
    <Box>
      <Box
        sx={{
          paddingTop: "20px",
          marginX: { xs: "1px", sm: "2px", md: "3px" },
          marginBottom: "150px",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            mb: 3,
            textAlign: "left",
            color: "#5E2E8C",
          }}
        >
          Upload KYC Documents
        </Typography>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit()}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              {initialDocuments.map((doc) => (
                <Box key={doc.id}>
                  <KycUploadCard
                  register={register}
                    name={doc.name}
                    image={doc.image}
                    imageName={doc.imageName}
                    control={methods.control}
                    rules={{ required: `${doc.imageName} is required.` }}
                    // verified={verified}
                    // id={id}
                    isKycFrom={isKycFrom}
                  />
                </Box>
              ))}
            </Box>
            {console.log(errors,"error")}
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
}
