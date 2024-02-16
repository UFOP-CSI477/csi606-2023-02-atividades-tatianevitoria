import { Typography } from "@mui/material"
import { Box } from "@mui/system"

interface IPageTitleProps {
    title: string
}

export default function PageTitle({ title }: IPageTitleProps) {

    return (
        <Box>
            <Typography
                component="h1"
                variant="h6"
                // color='primary'
                fontWeight={700}
                fontSize={30}
            >
                {title}
            </Typography>
            <Box height={5} width='100%' bgcolor='purple' borderRadius={1} />
        </Box>
    )
}